using Identity.Api.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Identity.Api.Services
{
    public class ApplicationClaimsIdentityFactory : UserClaimsPrincipalFactory<ApplicationUser>
    {
        public ApplicationClaimsIdentityFactory(UserManager<ApplicationUser> userManager, IOptions<IdentityOptions> optionsAccessor) : base(userManager, optionsAccessor)
        {
        }

        protected override async Task<ClaimsIdentity> GenerateClaimsAsync(ApplicationUser user)
        {
            var claims = await base.GenerateClaimsAsync(user);
            claims.AddClaims(await this.GetClaims(user));
            return claims;
        }


        private async Task<List<Claim>> GetClaims(ApplicationUser user)
        {
            var claims = new List<Claim>();
            try
            {
                var userClaims = await UserManager.GetClaimsAsync(user);
                var userRoles = await UserManager.GetRolesAsync(user);
                claims.AddRange(userClaims);
                foreach (var userRole in userRoles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, userRole));
                }
            }
            catch (Exception ex)
            {
                string err = ex.Message;
            }
            return claims;
        }

    }
}
