using AspNetCore.IQueryable.Extensions.Pagination;
using AspNetCore.IQueryable.Extensions.Sort;
using AspNetCore.IQueryable.Extensions;
using MediatR;
using PressStart2.Domain.DTOs;
using AspNetCore.IQueryable.Extensions.Attributes;
using AspNetCore.IQueryable.Extensions.Filter;

namespace PressStart2.Domain.Commands.GetSale
{
    public class GetAllSalesRequest : IRequest<CommandResponse>, ICustomQueryable, IQuerySort, IQueryPaging
    {
        [QueryOperator(Operator = WhereOperator.Contains)]
        public string Customer { get; set; }

        [QueryOperator(Operator = WhereOperator.Equals)]
        public int? QuantityItems { get; set; }

        [QueryOperator(Operator = WhereOperator.GreaterThanOrEqualTo)]
        public DateTime? SaleDate { get; set; }

        [QueryOperator(Operator = WhereOperator.GreaterThanOrEqualTo)]
        public DateTime? BillingDate { get; set; }

        [QueryOperator(Operator = WhereOperator.Equals)]
        public decimal? TotalValue { get; set; }

        public string Sort { get; set; }
        public int? Limit { get; set; }
        public int? Offset { get; set; }
    }
}
