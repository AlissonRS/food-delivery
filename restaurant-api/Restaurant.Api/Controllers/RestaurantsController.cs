using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Restaurants.Api.Model;
using Restaurants.Data.Context;
using Restaurants.Domain.Entities;
using Restaurants.Domain.Services.Interfaces;
using System.Linq;
using System.Threading.Tasks;

namespace Restaurants.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantsController : Controller
    {
        private readonly ApplicationDbContext dbContext;
        private readonly IUserContext userContext;

        public RestaurantsController(ApplicationDbContext dbContext, IUserContext userContext)
        {
            this.dbContext = dbContext;
            this.userContext = userContext;
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> All()
        {
            var currentUserId = userContext.GetUser().Id;
            var currentUserEmail = userContext.GetUser().Email;
            var restaurants = await dbContext.Restaurants
                .Where(r => !r.IsDeleted)
                .Where(r => !r.RestaurantBlockedUsers.Any(b => b.UserEmail == currentUserEmail))
                .Select(r => new RestaurantResponse
                {
                    CreatedAt = r.CreatedAt,
                    Description = r.Description,
                    FoodType = r.FoodType,
                    Id = r.Id,
                    Name = r.Name,
                    OwnerId = r.OwnerId
                })
                .ToListAsync();
            return Ok(restaurants);
        }

        [Authorize(Roles = "RestaurantOwner")]
        [HttpGet]
        [Route("my-list")]
        public async Task<IActionResult> MyList()
        {
            var currentUserId = userContext.GetUser().Id;
            var restaurants = await dbContext.Restaurants
                .Where(r => r.OwnerId == currentUserId && !r.IsDeleted)
                .Select(r => new RestaurantResponse
                {
                    CreatedAt = r.CreatedAt,
                    Description = r.Description,
                    FoodType = r.FoodType,
                    Id = r.Id,
                    Name = r.Name,
                    OwnerId = r.OwnerId
                })
                .ToListAsync();
            return Ok(restaurants);
        }

        [Authorize(Roles = "RestaurantOwner")]
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create(CreateRestaurantRequest model)
        {
            var currentUserId = userContext.GetUser().Id;

            var restaurant = new Restaurant
            {
                Name = model.Name,
                Description = model.Description,
                FoodType = model.FoodType,
                OwnerId = currentUserId,
            };
            dbContext.Restaurants.Add(restaurant);
            await dbContext.SaveChangesAsync();
            return Ok(new RestaurantResponse
            {
                CreatedAt = restaurant.CreatedAt,
                Description = restaurant.Description,
                FoodType = restaurant.FoodType,
                Id = restaurant.Id,
                Name = restaurant.Name,
                OwnerId = restaurant.OwnerId
            });
        }

        [Authorize(Roles = "RestaurantOwner")]
        [HttpPut]
        [Route("{restaurantId}/edit")]
        public async Task<IActionResult> Edit(string restaurantId, CreateRestaurantRequest model)
        {
            var currentUserId = userContext.GetUser().Id;

            var restaurant = await dbContext.Restaurants.Where(r => r.Id == restaurantId && r.OwnerId == currentUserId).FirstOrDefaultAsync();
            if (restaurant != null)
            {
                restaurant.Name = model.Name;
                restaurant.Description = model.Description;
                restaurant.FoodType = model.FoodType;
                await dbContext.SaveChangesAsync();
                return Ok(new RestaurantResponse
                {
                    CreatedAt = restaurant.CreatedAt,
                    Description = restaurant.Description,
                    FoodType = restaurant.FoodType,
                    Id = restaurant.Id,
                    Name = restaurant.Name,
                    OwnerId = restaurant.OwnerId
                });
            }
            return NotFound();
        }

        [Authorize(Roles = "RestaurantOwner")]
        [HttpDelete]
        [Route("{restaurantId}/delete")]
        public async Task<IActionResult> Delete(string restaurantId)
        {
            var currentUserId = userContext.GetUser().Id;

            var restaurant = await dbContext.Restaurants.Where(r => r.Id == restaurantId && r.OwnerId == currentUserId).FirstOrDefaultAsync();
            if (restaurant != null)
            {
                restaurant.IsDeleted = true;
                await dbContext.SaveChangesAsync();
                return Ok();
            }
            return NotFound();
        }

        [HttpGet]
        [Route("{restaurantId}/meals")]
        public async Task<IActionResult> Meals(string restaurantId)
        {
            var currentUserId = userContext.GetUser().Id;
            var currentUserEmail = userContext.GetUser().Email;

            var meals = await dbContext.Meals
                .Where(m => m.RestaurantId == restaurantId && !m.IsDeleted)
                .Where(m => !m.Restaurant.IsDeleted)
                .Where(m => !m.Restaurant.RestaurantBlockedUsers.Any(b => b.UserEmail == currentUserEmail))
                .Select(m => new MealResponse
                {
                    Id = m.Id,
                    CreatedAt = m.CreatedAt,
                    Description = m.Description,
                    Name = m.Name,
                    Price = m.Price,
                    RestaurantId = m.RestaurantId
                })
                .ToListAsync();

            return Ok(meals);
        }

        [Authorize(Roles = "RestaurantOwner")]
        [HttpGet]
        [Route("{restaurantId}/blocked-users")]
        public async Task<IActionResult> ListBlockedUsers(string restaurantId)
        {
            var currentUserId = userContext.GetUser().Id;
            var users = await dbContext.RestaurantBlockedUsers
                .Where(r => r.RestaurantId == restaurantId && r.Restaurant.OwnerId == currentUserId)
                .Select(r => r.UserEmail)
                .ToListAsync();
            return Ok(users);
        }

        [Authorize(Roles = "RestaurantOwner")]
        [HttpPost]
        [Route("block-user")]
        public async Task<IActionResult> BlockUser(BlockUserInRestaurantRequest model)
        {
            var currentUserId = userContext.GetUser().Id;

            var restaurant = await dbContext.Restaurants.Where(r => r.OwnerId == currentUserId && r.Id == model.RestaurantId).FirstOrDefaultAsync();
            if (restaurant == null)
                return NotFound();

            bool exists = await dbContext.RestaurantBlockedUsers.Where(r => r.RestaurantId == model.RestaurantId && r.UserEmail == model.UserEmail).AnyAsync();
            if (!exists)
            {
                restaurant.RestaurantBlockedUsers.Add(new RestaurantBlockedUsers
                {
                    UserEmail = model.UserEmail,
                    RestaurantId = model.RestaurantId
                });
                await dbContext.SaveChangesAsync();
            }
            return Ok();
        }

        [Authorize(Roles = "RestaurantOwner")]
        [HttpPost]
        [Route("unblock-user")]
        public async Task<IActionResult> UnblockUser(BlockUserInRestaurantRequest model)
        {
            var currentUserId = userContext.GetUser().Id;

            var blockedUser = await dbContext.RestaurantBlockedUsers
                .Where(r => r.Restaurant.OwnerId == currentUserId)
                .Where(r => r.RestaurantId == model.RestaurantId)
                .Where(r => r.UserEmail == model.UserEmail)
                .FirstOrDefaultAsync();
            if (blockedUser == null)
                return NotFound();
            dbContext.RestaurantBlockedUsers.Remove(blockedUser);
            await dbContext.SaveChangesAsync();
            return Ok();
        }

    }
}