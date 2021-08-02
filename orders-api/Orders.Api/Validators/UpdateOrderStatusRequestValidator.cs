using FluentValidation;
using Orders.Api.Models;

namespace Orders.Api.Validators
{
    public class UpdateOrderStatusRequestValidator : AbstractValidator<UpdateOrderStatusRequest>
    {
        public UpdateOrderStatusRequestValidator()
        {
            RuleFor(e => e.OrderId)
                .NotEmpty()
                .WithMessage("OrderId is required.");

            RuleFor(e => e.Status)
                .NotEmpty()
                .WithMessage("Status is required.");
        }
    }
}
