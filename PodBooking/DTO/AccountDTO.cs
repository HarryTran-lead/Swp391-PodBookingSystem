﻿namespace PodBooking.DTO
{
    public class AccountDTO
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Username { get; set; }

        public string? Email { get; set; }

        public string? Password { get; set; }

        public string? Phone { get; set; }

        public string? Status { get; set; }

        public string? Role { get; set; }

        public string? Gender { get; set; }
    }

    public class AccountDTOClient
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Username { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }

        public string? Status { get; set; }

        public string? Role { get; set; }

        public string? Gender { get; set; }
    }
}