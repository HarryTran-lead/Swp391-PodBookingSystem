using System;
using System.Collections.Generic;

namespace PodBooking.Models;

public partial class FoodOrderDetail
{
    public int FoodId { get; set; }

    public int BookingId { get; set; }

    public int AccountId { get; set; }

    public int? Quantity { get; set; }

    public decimal? Total { get; set; }

    public virtual FoodMenu Food { get; set; } = null!;

    public virtual FoodOrder FoodOrder { get; set; } = null!;
}
