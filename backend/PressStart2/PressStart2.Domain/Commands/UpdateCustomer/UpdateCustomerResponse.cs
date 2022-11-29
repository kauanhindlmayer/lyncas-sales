namespace PressStart2.Domain.Commands.UpdateCustomer
{
    public class UpdateCustomerResponse
    {
        public UpdateCustomerResponse(string message)
        {
            Message = message;
        }

        public string Message { get; set; }
    }
}
