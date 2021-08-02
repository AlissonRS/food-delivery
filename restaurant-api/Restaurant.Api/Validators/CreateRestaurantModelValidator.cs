using FluentValidation;
using Restaurants.Api.Model;

namespace Restaurants.Api.Validators
{
    public class CreateRestaurantModelValidator : AbstractValidator<CreateRestaurantRequest>
    {
        public CreateRestaurantModelValidator()
        {
            RuleFor(e => e.Name)
                .NotEmpty()
                .WithMessage("Name is required.")
                .Length(2, 100)
                .WithMessage("Name must have between 2 and 100 characters.");

            RuleFor(e => e.Description)
                .MaximumLength(4000)
                .WithMessage("Description max length is 4000 characters.");

            RuleFor(e => e.FoodType)
                .NotNull()
                .WithMessage("Food Type is required.");
        }
    }
}
