using Restaurants.Domain.Models;

namespace Restaurants.Domain.Services.Interfaces
{
    public interface IUserContext
    {
        UserData GetUser();
    }
}
