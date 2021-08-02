using FluentValidation;
using Identity.Api.Model;

namespace Identity.Api.Validators
{
    public class RegisterModelValidator : AbstractValidator<RegisterModel>
    {
        public RegisterModelValidator()
        {
            RuleFor(e => e.FullName)
                .NotEmpty()
                .WithMessage("Name is required.")
                .Length(2, 100)
                .WithMessage("Name must have between 2 and 100 characters.");

            RuleFor(e => e.Email)
                .NotEmpty()
                .WithMessage("Email is required.")
                .Length(3, 256)
                .WithMessage("Email must have between 3 and 256 characters.");

            RuleFor(e => e.Password)
                .NotEmpty()
                .WithMessage("Password is required.")
                .MinimumLength(6)
                .WithMessage("Password must have at least 3 characters.");
        }
    }
}
