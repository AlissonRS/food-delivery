using Identity.Api.Extensions;
using Identity.Api.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace Identity.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : Controller
    {
        private readonly IOptions<JwtSettings> jwtSecrets;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly UserManager<ApplicationUser> userManager;

        public UsersController(IOptions<JwtSettings> jwtSecrets,
                                SignInManager<ApplicationUser> signInManager,
                                UserManager<ApplicationUser> userManager)
        {
            this.jwtSecrets = jwtSecrets;
            this.signInManager = signInManager;
            this.userManager = userManager;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("authenticate")]
        public async Task<IActionResult> Authenticate(AuthenticateModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);

            if (user == null)
                return BadRequest(new { message = "Email or password is incorrect" });

            var validPassword = await userManager.CheckPasswordAsync(user, model.Password);
            if (!validPassword)
                return BadRequest(new { message = "Email or password is incorrect" });

            string token = await signInManager.GenerateToken(user, jwtSecrets.Value.Secret);

            return Ok(new { token });
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user != null)
                return BadRequest("User already registered");

            user = new ApplicationUser
            {
                Email = model.Email,
                UserName = model.Email,
                FullName = model.FullName
            };
            var result = await userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                result = await userManager.AddToRoleAsync(user, model.RoleType.ToString());
                if (result.Succeeded)
                {
                    string token = await signInManager.GenerateToken(user, jwtSecrets.Value.Secret);
                    return Ok(new { token });
                }
            }
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error.Description);
            }
            return BadRequest(ModelState);
        }

    }
}