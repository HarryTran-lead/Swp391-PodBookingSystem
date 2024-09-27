using System.ComponentModel.DataAnnotations;

namespace SWP.Dto.Account
{
    public class SignUpAccountDto
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required, EmailAddress]
        public string Email { get; set; } = null;
        [Required]
        public string Password { get; set; } = null;
        [Required]
        public string ConfirmPassword { get; set; } = null;
    }
}
