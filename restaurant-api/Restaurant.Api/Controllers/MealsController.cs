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
    [Authorize(Roles = "RestaurantOwner")]
    [Route("api/[controller]")]
    [ApiController]
    public class MealsController : Controller
    {
        private readonly ApplicationDbContext dbContext;
        private readonly IUserContext userContext;

        public MealsController(ApplicationDbContext dbContext, IUserContext userContext)
        {
            this.dbContext = dbContext;
            this.userContext = userContext;
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create(CreateMealRequest model)
        {
            var currentUserId = userContext.GetUser().Id;

            var restaurant = await dbContext.Restaurants.Where(r => r.Id == model.RestaurantId && r.OwnerId == currentUserId).FirstOrDefaultAsync();
            if (restaurant == null)
            {
                return NotFound();
            }

            var meal = new Meal
            {
                Name = model.Name,
                Description = model.Description,
                RestaurantId = model.RestaurantId,
                Price = model.Price
            };
            restaurant.Meals.Add(meal);
            await dbContext.SaveChangesAsync();
            return Ok(new MealResponse
            {
                Id = meal.Id,
                CreatedAt = meal.CreatedAt,
                Description = meal.Description,
                Name = meal.Name,
                Price = meal.Price,
                RestaurantId = meal.RestaurantId
            });
        }

        [HttpPut]
        [Route("{mealId}/edit")]
        public async Task<IActionResult> Edit(string mealId, CreateMealRequest model)
        {
            var currentUserId = userContext.GetUser().Id;

            var meal = await dbContext.Meals.Where(m => m.Id == mealId && m.Restaurant.OwnerId == currentUserId).FirstOrDefaultAsync();
            if (meal != null)
            {
                meal.Name = model.Name;
                meal.Description = model.Description;
                meal.Price = model.Price;
                await dbContext.SaveChangesAsync();
                return Ok(new MealResponse
                {
                    Id = meal.Id,
                    CreatedAt = meal.CreatedAt,
                    Description = meal.Description,
                    Name = meal.Name,
                    Price = meal.Price,
                    RestaurantId = meal.RestaurantId
                });
            }
            return NotFound();
        }

        [HttpDelete]
        [Route("{mealId}/delete")]
        public async Task<IActionResult> Delete(string mealId)
        {
            var currentUserId = userContext.GetUser().Id;

            var meal = await dbContext.Meals.Where(m => m.Id == mealId && m.Restaurant.OwnerId == currentUserId).FirstOrDefaultAsync();
            if (meal != null)
            {
                meal.IsDeleted = true;
                await dbContext.SaveChangesAsync();
                return Ok();
            }
            return NotFound();
        }

    }
}