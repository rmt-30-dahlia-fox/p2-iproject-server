class MailFormatter {
    static memberMail(member){
    let title = 'Mr.'
    if (member.gender == 'Female') title = 'Mrs.'
    return `
    Dear ${title} ${member.name},
    
    Thanks for joining into marQofy mart Membership
    Please Use Your Name/Phone Number at cashier for bonus point

    With warmth regard, marQofy Leader
    `
    }

    static userMail(user){
        return `
        Dear ${user.fullName},
        please use this account with userName ${user.userName}
        to login in our cashier app.

        We sincerely looking forward to working with you

        With warmth regard, marQofy Leader
        `
    }
}

module.exports = MailFormatter;