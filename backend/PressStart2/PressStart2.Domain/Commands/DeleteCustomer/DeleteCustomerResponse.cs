namespace PressStart2.Domain.Commands.DeleteCustomer
{
    public class DeleteCustomerResponse
    {
        public DeleteCustomerResponse(string message)
        {
            Message = message;
        }

        public string Message { get; set; }
    }
}
