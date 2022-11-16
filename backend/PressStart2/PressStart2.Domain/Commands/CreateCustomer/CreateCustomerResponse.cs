namespace PressStart2.Domain.Commands.CreateCustomer
{
    public class CreateCustomerResponse
    {
        public Guid Id { get; set; }
        public string Message { get; set; }

        public CreateCustomerResponse()
        {

        }

        public CreateCustomerResponse(Guid id, string message)
        {
            Id = id;
            Message = message;
        }
    }
}
