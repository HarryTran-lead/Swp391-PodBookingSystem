using System;
using System.Collections.Generic;

namespace PodBooking.Models;

public partial class Cart
{
    public int BookingId { get; set; }

    public int AccountId { get; set; }

    public decimal? TotalAmount { get; set; }

    public virtual Booking Booking { get; set; } = null!;
}
