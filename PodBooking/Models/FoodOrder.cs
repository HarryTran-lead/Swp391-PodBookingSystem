using System;
using System.Collections.Generic;

namespace PodBooking.Models;

public partial class FoodOrder
{
    public int BookingId { get; set; }

    public int AccountId { get; set; }

    public decimal? Total { get; set; }

    public int? PayMethodId { get; set; }

    public string? Status { get; set; }

    public virtual Account Account { get; set; } = null!;

    public virtual Booking Booking { get; set; } = null!;

    public virtual ICollection<FoodOrderDetail> FoodOrderDetails { get; set; } = new List<FoodOrderDetail>();

    public virtual PayMethod? PayMethod { get; set; }
}
