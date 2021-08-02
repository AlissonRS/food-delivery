using FluentValidation;
using Identity.Api.Model;

namespace Identity.Api.Validators
{
    public class AuthenticateModelValidator : AbstractValidator<AuthenticateModel>
    {
        public AuthenticateModelValidator()
        {
            RuleFor(e => e.Email)
                .NotEmpty()
                .WithMessage("Please provide your email.");

            RuleFor(e => e.Password)
                .NotEmpty()
                .WithMessage("Please provide your password.");
        }
    }
}
