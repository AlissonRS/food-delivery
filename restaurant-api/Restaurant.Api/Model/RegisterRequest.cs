namespace Restaurants.Api.Model
{
    public class RegisterRequest
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ReturnUrl { get; set; }
        public RoleType RoleType { get; set; }
    }
}
