using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Orders.Api.Models;
using Orders.Data.Context;
using Orders.Domain.Entities;
using Orders.Domain.Enums;
using Orders.Domain.Services.Interfaces;
using System.Linq;
using System.Threading.Tasks;

namespace Orders.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : Controller
    {
        private readonly ApplicationDbContext dbContext;
        private readonly IUserContext userContext;

        public OrdersController(ApplicationDbContext dbContext, IUserContext userContext)
        {
            this.dbContext = dbContext;
            this.userContext = userContext;
        }

        [HttpGet]
        [Route("")]
        public async Task<IActionResult> MyOrders()
        {
            var currentUserId = userContext.GetUser().Id;
            var orders = await dbContext.Orders
                .Where(o => !o.IsDeleted)
                .Where(o => o.PayeeId == currentUserId || o.PayerId == currentUserId)
                .Select(o => new OrderResponse
                {
                    CreatedAt = o.CreatedAt,
                    PayerId = o.PayerId,
                    PayeeId = o.PayeeId,
                    OrderId = o.Id,
                    Status = o.Status,
                    TotalAmount = o.TotalAmount,
                    Items = o.Items.Select(i => new OrderItemResponse
                    {
                        Amount = i.Amount,
                        Description = i.Description,
                        Quantity = i.Quantity
                    }).ToList(),
                    History = o.History.Select(h => new OrderHistoryResponse
                    {
                        CreatedAt = h.CreatedAt,
                        StatusByUserId = h.StatusByUserId,
                        OrderStatus = h.OrderStatus
                    }).ToList()
                })
                .ToListAsync();

            return Ok(orders);
        }

        [Authorize(Roles = "RegularUser")]
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create(CreateOrderRequest model)
        {
            var currentUserId = userContext.GetUser().Id;

            var order = new Order
            {
                Items = model.Items.Select(i => new OrderItem
                {
                    Amount = i.Amount.Value,
                    Description = i.Description,
                    Quantity = i.Quantity
                }).ToList(),
                TotalAmount = model.Items.Sum(i => i.Amount.Value * i.Quantity),
                PayerId = currentUserId,
                PayeeId = model.PayeeId
            };
            order.History.Add(new OrderHistory
            {
                StatusByUserId = currentUserId,
                OrderStatus = order.Status
            });
            dbContext.Orders.Add(order);
            await dbContext.SaveChangesAsync();
            return Ok(new OrderResponse
            {
                OrderId = order.Id,
                CreatedAt = order.CreatedAt,
                PayerId = order.PayerId,
                PayeeId = order.PayeeId,
                Status = order.Status,
                TotalAmount = order.TotalAmount
            });
        }

        [HttpPut]
        [Route("update-status")]
        public async Task<IActionResult> Edit(UpdateOrderStatusRequest model)
        {
            var currentUserId = userContext.GetUser().Id;

            var order = await dbContext.Orders
                .Include(o => o.Items)
                .Include(o => o.History)
                .Where(o => o.Id == model.OrderId)
                .Where(o => o.PayeeId == currentUserId || o.PayerId == currentUserId)
                .FirstOrDefaultAsync();

            if (order != null)
            {
                bool successful = order.UpdateStatus(model.Status.Value, currentUserId);
                if (successful)
                {
                    await dbContext.SaveChangesAsync();
                }
                if (!successful)
                {
                    switch (order.Status)
                    {
                        case OrderStatus.Cancelled:
                            return BadRequest("This order has been cancelled");
                        case OrderStatus.Processing:
                            return BadRequest("This order is already being processed, you no longer can cancel it!");
                        default:
                            return BadRequest("This order no longer can be changed!");
                    }
                }
                return Ok(new OrderResponse
                {
                    CreatedAt = order.CreatedAt,
                    PayerId = order.PayerId,
                    PayeeId = order.PayeeId,
                    OrderId = order.Id,
                    Status = order.Status,
                    TotalAmount = order.TotalAmount,
                    Items = order.Items.Select(i => new OrderItemResponse
                    {
                        Amount = i.Amount,
                        Description = i.Description,
                        Quantity = i.Quantity
                    }).ToList(),
                    History = order.History.Select(h => new OrderHistoryResponse
                    {
                        CreatedAt = h.CreatedAt,
                        StatusByUserId = h.StatusByUserId,
                        OrderStatus = h.OrderStatus
                    }).ToList()
                });
            }
            return NotFound();
        }

    }
}