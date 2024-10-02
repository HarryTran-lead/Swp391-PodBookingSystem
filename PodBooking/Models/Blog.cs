using System;
using System.Collections.Generic;

namespace PodBooking.Models;

public partial class Blog
{
    public int Id { get; set; }

    public int? AdminId { get; set; }

    public string? Img { get; set; }

    public string? Context { get; set; }
}
