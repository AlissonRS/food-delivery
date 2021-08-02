using FluentValidation;
using Orders.Api.Models;

namespace Orders.Api.Validators
{
    public class CreateOrderRequestValidator : AbstractValidator<CreateOrderRequest>
    {
        public CreateOrderRequestValidator()
        {
            RuleFor(e => e.Items)
                .NotEmpty()
                .WithMessage("Name is required.");

            RuleForEach(e => e.Items)
                .ChildRules(item =>
                {
                    item.RuleFor(i => i.Amount)
                    .NotNull()
                    .WithMessage("Amount is required for all Order Items");

                    item.RuleFor(i => i.Quantity)
                    .GreaterThan(0)
                    .WithMessage("Quantity can't be zero");

                    item.RuleFor(i => i.Description)
                    .NotEmpty()
                    .WithMessage("Description is required for all Order Items")
                    .MaximumLength(512)
                    .WithMessage("Maximum length for Description is 512");
                });
        }
    }
}
