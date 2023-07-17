function skillsMember()
{
    var member = document.getElementById("member").value;
    var memberError = document.getElementById("memberError");
    var memberRegex = /^[a-zA-Z ]{2,30}$/;
    if(memberRegex.test(member))
    {
        memberError.innerHTML = "Valid";
        memberError.style.color = "green";
        return true;
    }
    else
    {
        memberError.innerHTML = "Invalid";
        memberError.style.color = "red";
        return false;
    }
}

