Feature: Booking a seat
    Scenario: Booking a VIP seat
        Given user is on "qamid.tmweb.ru" page
        When user chooses by day "7"
        When user chooses movie "2" show "2"
        When user chooses seat Vip "1"
        When user click "button"
        Then user sees text "Вы выбрали билеты:"
        Then user sees the reserved seat "1/2"

    Scenario: Booking two standard seats
        Given user is on "qamid.tmweb.ru" page
        When user chooses by day "6"
        When user chooses movie "1" show "2"
        When user chooses seat "2", "1"
        When user chooses seat "2", "2"
        When user click "button"
        Then user sees text "Вы выбрали билеты:"
        Then user sees the reserved seat "2/1, 2/2"

    Scenario: The place is not booked
        Given user is on "qamid.tmweb.ru" page
        When user chooses by day "3"
        When user chooses movie "1" show "2"
        When user click "button"
        Then user should not see the page title "Электорнный билет"