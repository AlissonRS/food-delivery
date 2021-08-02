using Orders.Domain.Models;

namespace Orders.Domain.Services.Interfaces
{
    public interface IUserContext
    {
        UserData GetUser();
    }
}
