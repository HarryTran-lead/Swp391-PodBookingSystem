using System;
using System.Collections.Generic;

namespace PodBooking.Models;

public partial class Feedback
{
    public int Id { get; set; }

    public int? AccountId { get; set; }

    public int? BookingId { get; set; }

    public int? Rating { get; set; }

    public string? Comments { get; set; }

    public DateOnly? FeedbackDate { get; set; }

    public virtual Booking? Booking { get; set; }
}
