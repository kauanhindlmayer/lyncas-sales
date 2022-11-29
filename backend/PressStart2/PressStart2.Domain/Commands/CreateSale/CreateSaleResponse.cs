namespace PressStart2.Domain.Commands.CreateSale
{
    public class CreateSaleResponse
    {
        public Guid Id { get; set; }
        public string Message { get; set; }

        public CreateSaleResponse(Guid id, string message)
        {
            Id = id;
            Message = message;
        }
    }
}
