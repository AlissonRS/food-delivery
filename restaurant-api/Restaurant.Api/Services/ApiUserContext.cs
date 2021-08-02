using Microsoft.AspNetCore.Http;
using Restaurants.Domain.Models;
using Restaurants.Domain.Services.Interfaces;
using System.Linq;
using System.Security.Claims;

namespace Restaurants.Api.Services
{
    public class ApiUserContext : IUserContext
    {
        private HttpContext httpContext;
        private UserData user;

        public ApiUserContext(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContext = httpContextAccessor.HttpContext;
        }

        public UserData GetUser()
        {
            if (this.user == null)
            {
                this.user = new UserData
                {
                    Id = httpContext.User.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).Select(c => c.Value).FirstOrDefault(),
                    Email = httpContext.User.Claims.Where(c => c.Type == ClaimTypes.Name).Select(c => c.Value).FirstOrDefault(),
                };
            }
            return this.user;
        }
    }
}
