using System;
using System.Collections.Generic;

namespace PodBooking.Models;

public partial class Notification
{
    public int NotificationId { get; set; }

    public string? NotificationName { get; set; }

    public int? AccountId { get; set; }

    public int? BookingId { get; set; }

    public string? Message { get; set; }

    public DateTime? SentTime { get; set; }

    public bool? ReadStatus { get; set; }

    public virtual Account? Account { get; set; }

    public virtual Booking? Booking { get; set; }
}
