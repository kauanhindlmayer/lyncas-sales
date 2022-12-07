using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PressStart2.Domain.Entities;

namespace PressStart2.Infra.Data.Configurations
{
    public class SaleConfiguration : IEntityTypeConfiguration<Sale>
    {
        public void Configure(EntityTypeBuilder<Sale> builder)
        {
            builder.HasKey(p => p.Id);

            builder.Property(p => p.CustomerId)
                .IsRequired();

            builder.Property(p => p.QuantityItems)
                .IsRequired();

            builder.Property(p => p.SaleDate)
                .IsRequired();

            builder.Property(p => p.BillingDate)
                .IsRequired();

            builder.Property(p => p.TotalValue)
                .HasPrecision(18, 2)
                .IsRequired();

            builder.ToTable("Sale");
        }
    }
}
