using Microsoft.AspNetCore.Identity;

namespace Identity.Api.Model
{
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; }
    }
}
