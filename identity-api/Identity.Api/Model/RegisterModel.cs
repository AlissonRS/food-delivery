namespace Identity.Api.Model
{
    public class RegisterModel
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ReturnUrl { get; set; }
        public RoleType RoleType { get; set; }
    }
}
