using PressStart2.Domain.Entities.Contracts;

namespace PressStart2.Domain.Entities
{
    public class Customer : BaseEntity
    {
        public string Name { get; private set; }
        public string Email { get; private set; }
        public string Phone { get; private set; }
        public string Cpf { get; private set; }
        public bool IsActive { get; private set; }

        protected Customer() { }

        public Customer(string name, string email, string phone, string cpf)
        {
            Name = name;
            Email = email;
            Phone = phone;
            Cpf = cpf;
            IsActive = true;

            this.AddCustomerContract();
        }

        public void Update(string name, string email, string phone, string cpf)
        {
            Name = name;
            Email = email;
            Phone = phone;
            Cpf = cpf;

            this.UpdateCustomerContract();
        }

        public void Inactivate()
        {
            IsActive = false;
        }
    }
}
