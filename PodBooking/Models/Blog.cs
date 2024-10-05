using System;
using System.Collections.Generic;

namespace PodBooking.Models;

public partial class Blog
{
    public int Id { get; set; }

    public int? AdminId { get; set; }

    public byte[]? Img { get; set; }

    public string? ShortDes { get; set; }

    public string? MainDes { get; set; }

    public string? Title { get; set; }
}
