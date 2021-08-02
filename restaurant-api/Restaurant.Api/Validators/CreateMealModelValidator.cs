using FluentValidation;
using Restaurants.Api.Model;

namespace Restaurants.Api.Validators
{
    public class CreateMealModelValidator : AbstractValidator<CreateMealRequest>
    {
        public CreateMealModelValidator()
        {
            RuleFor(e => e.Name)
                .NotEmpty()
                .WithMessage("Name is required.")
                .Length(2, 100)
                .WithMessage("Name must have between 2 and 100 characters.");

            RuleFor(e => e.Description)
                .MaximumLength(4000)
                .WithMessage("Description max length is 4000 characters.");

            RuleFor(e => e.Price)
                .NotNull()
                .WithMessage("Price is required.");
        }
    }
}
