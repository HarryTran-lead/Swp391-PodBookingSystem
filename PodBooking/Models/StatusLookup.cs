using System;
using System.Collections.Generic;

namespace PodBooking.Models;

public partial class StatusLookup
{
    public int StatusId { get; set; }

    public string StatusDescription { get; set; } = null!;

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();
}
