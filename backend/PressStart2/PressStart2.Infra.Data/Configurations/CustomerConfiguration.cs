using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PressStart2.Domain.Entities;

namespace PressStart2.Infra.Data.Configurations
{
    public class CustomerConfiguration : IEntityTypeConfiguration<Customer>
    {
        public void Configure(EntityTypeBuilder<Customer> builder)
        {
            builder.HasKey(p => p.Id);

            builder.Property(p => p.Name)
                .HasColumnType("varchar")
                .HasMaxLength(200)
                .IsRequired();

            builder.Property(p => p.Email)
                .HasColumnType("varchar")
                .HasMaxLength(300)
                .IsRequired();

            builder.Property(p => p.Phone)
                .HasColumnType("varchar")
                .HasMaxLength(20)
                .IsRequired();

            builder.Property(p => p.Cpf)
                .HasColumnType("varchar")
                .HasMaxLength(14)
                .IsRequired();

            builder.Property(p => p.IsActive)
                .IsRequired();

            builder.ToTable("Customer");
        }
    }
}
