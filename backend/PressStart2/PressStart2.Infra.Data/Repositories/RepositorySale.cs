﻿using Microsoft.EntityFrameworkCore;
using PressStart2.Domain.Entities;
using PressStart2.Domain.Interfaces.Repositories;
using PressStart2.Infra.Data.Context;

namespace PressStart2.Infra.Data.Repositories
{
    public class RepositorySale : RepositoryBase<Sale>, IRepositorySale
    {
        public RepositorySale(PressStart2Context context) : base(context)
        {

        }

        //public IEnumerable<Sale> GetAllWithDependency()
        //{
        //    return _context.SaleDbSet.Include(p => p.Customer).Include(p => p.Items).AsEnumerable();
        //}

        //public Sale GetWithDependecy(Guid Id)
        //{
        //    return _context.SaleDbSet.Include(p => p.Customer).Include(p => p.Items).FirstOrDefault(p => p.Id == Id);
        //}
    }
}

