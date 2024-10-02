using System;
using System.Collections.Generic;

namespace PodBooking.Models;

public partial class FoodMenu
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Type { get; set; }

    public decimal? PricePerUnit { get; set; }

    public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();

    public virtual ICollection<FoodOrderDetail> FoodOrderDetails { get; set; } = new List<FoodOrderDetail>();
}
