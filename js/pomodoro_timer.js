"use strict";

var timerType = '';
var intervalId;
var flag = true;

/**
 * Starts timer
 * @param minutes, seconds
 */
function startTimer(minutes, seconds) {
    flag = false;
    intervalId = setInterval(function () {
        var numberMinutes = minutes;
        if (seconds === 0) {
            seconds = 60;
        }
        seconds -= 1;
        var numberSeconds = seconds;
        if (numberSeconds === 59) {
            minutes -= 1;
            numberMinutes = minutes;
        }
        else if (numberSeconds >= 0 && numberSeconds <= 9) {
            numberSeconds = '0' + numberSeconds;
        }
        if (numberMinutes >= 0 && numberMinutes <= 9) {
            numberMinutes = '0' + numberMinutes;
        }
        $('#pomodoro_timer').html(numberMinutes + ':' + numberSeconds);
        $('title').text('(' + numberMinutes + ':' + numberSeconds + ') Study Timer');
        if (numberSeconds === '00' && numberMinutes === '00') {
            flag = true;
            clearInterval(intervalId);
            $('#start_pomodoro_timer').attr('disabled', 'disabled');
            $('#stop_pomodoro_timer').attr('disabled', 'disabled');
            $('#reset_pomodoro_timer').removeAttr('disabled');
            $('title').text('Buzzzzzz!');
            if (!Notification) {
                alert('Desktop notifications not available in your browser. Try Chromium.');
                return;
            }

            if (Notification.permission !== "granted") {
                Notification.requestPermission();
            }
            else {
                var notification = new Notification('Study Timer', {
                    icon: "../favicon.ico",
                    body: "Hey there! Your time is up!"
                });

                var notificationTimeoutId = setTimeout(notification.close.bind(notification), Math.round(soundDuration * 1000));

                notification.onclick = function () {
                    notification.close.bind(notification)();
                    clearTimeout(notificationTimeoutId);
                };
                notification.onclose = function () {
                }

            }
            var timerType = $('.active_timer_button').attr('id');
            setProductivityHistory(timerType);
        }
        else {
            flag = false;
        }
    }, 1000);
}

/**
 * Starts timer
 * @param obj
 */
function startPomodoroTimer(obj) {
    flag = false;
    $('#timer_ended_sound').remove();
    $(obj).addClass('active_timer_button');
    $('#short_break').removeClass('active_timer_button');
    $('#long_break').removeClass('active_timer_button');
    $('#start_pomodoro_timer').attr('disabled', 'disabled');
    $('#stop_pomodoro_timer').removeAttr('disabled');
    $('#reset_pomodoro_timer').removeAttr('disabled');
    timerType = 'pomodoro';
    clearInterval(intervalId);
    var minutes = $('#pomodoro_timer_minutes').val();
    var seconds = $('#pomodoro_timer_seconds').val();
    if(minutes.length === 1){
        minutes = '0'+minutes;
    }

    if(seconds.length === 1){
        seconds = '0'+seconds;
    }
    $('#pomodoro_timer').html(minutes+':'+seconds);
    $('title').text('Study Timer');
    startTimer(Number(minutes), Number(seconds));
}

/**
 * Starts short break timer
 * @param obj
 */
function startShortBreak(obj) {
    flag = false;
    $('#timer_ended_sound').remove();
    $(obj).addClass('active_timer_button');
    $('#pomodoro').removeClass('active_timer_button');
    $('#long_break').removeClass('active_timer_button');
    $('#start_pomodoro_timer').attr('disabled', 'disabled');
    $('#stop_pomodoro_timer').removeAttr('disabled');
    $('#reset_pomodoro_timer').removeAttr('disabled');
    timerType = 'short';
    clearInterval(intervalId);
    var minutes = $('#short_break_minutes').val();
    var seconds = $('#short_break_seconds').val();
    if(minutes.length === 1){
        minutes = '0'+minutes;
    }

    if(seconds.length === 1){
        seconds = '0'+seconds;
    }
    $('#pomodoro_timer').html(minutes+':'+seconds);
    $('title').text('Study Timer');
    startTimer(Number(minutes), Number(seconds));
}

/**
 * Starts long break timer
 * @param obj
 */
function startLongBreak(obj) {
    flag = false;
    $('#timer_ended_sound').remove();
    $(obj).addClass('active_timer_button');
    $('#pomodoro').removeClass('active_timer_button');
    $('#short_break').removeClass('active_timer_button');
    $('#start_pomodoro_timer').attr('disabled', 'disabled');
    $('#stop_pomodoro_timer').removeAttr('disabled');
    $('#reset_pomodoro_timer').removeAttr('disabled');
    timerType = 'long';
    clearInterval(intervalId);
    var minutes = $('#long_break_minutes').val();
    var seconds = $('#long_break_seconds').val();
    if(minutes.length === 1){
        minutes = '0'+minutes;
    }

    if(seconds.length === 1){
        seconds = '0'+seconds;
    }
    $('#pomodoro_timer').html(minutes+':'+seconds);
    $('title').text('Study Timer');
    startTimer(Number(minutes), Number(seconds));
}

/**
 * Stops timer
 * @param obj
 */
function stopTimerWithButton(obj){
    flag = true;
    $(obj).attr('disabled', 'disabled');
    $('#start_pomodoro_timer').removeAttr('disabled');
    $('#reset_pomodoro_timer').removeAttr('disabled');
    clearInterval(intervalId);

}

/**
 * Starts timer
 * @param obj
 */
function startTimerWithButton(obj){
    flag = false;
    $(obj).attr('disabled', 'disabled');
    $('#stop_pomodoro_timer').removeAttr('disabled');
    $('#reset_pomodoro_timer').removeAttr('disabled');
    var time = $('#pomodoro_timer').text();
    time = time.split(':');
    var minutes = Number(time[0]);
    var seconds = Number(time[1]);
    clearInterval(intervalId);
    startTimer(minutes, seconds);
}

/**
 * Resets timer
 * @param obj
 */
function resetTimerWithButton(obj){
    flag = true;
    var minutes, seconds;
    $(obj).attr('disabled', 'disabled');
    $('#start_pomodoro_timer').removeAttr('disabled');
    $('#stop_pomodoro_timer').removeAttr('disabled');
    clearInterval(intervalId);
    $('title').text('Study Timer');
    if (timerType === 'short') {
        minutes = $('#short_break_minutes').val();
        seconds = $('#short_break_seconds').val();
        if(minutes.length === 1){
            minutes = '0'+minutes;
        }

        if(seconds.length === 1){
            seconds = '0'+seconds;
        }
        $('#pomodoro_timer').html(minutes+":"+seconds);
    }
    else if (timerType === 'long') {
        minutes = $('#long_break_minutes').val();
        seconds = $('#long_break_seconds').val();
        if(minutes.length === 1){
            minutes = '0'+minutes;
        }

        if(seconds.length === 1){
            seconds = '0'+seconds;
        }
        $('#pomodoro_timer').html(minutes+":"+seconds);
    }
    else {
        minutes = $('#pomodoro_timer_minutes').val();
        seconds = $('#pomodoro_timer_seconds').val();
        if(minutes.length === 1){
            minutes = '0'+minutes;
        }

        if(seconds.length === 1){
            seconds = '0'+seconds;
        }
        $('#pomodoro_timer').html(minutes+":"+seconds);
    }
}
//settings
function setTimes(){
    var minutes, seconds;
    var pomodoroMin = $('#pomodoro_timer_minutes').val();
    var pomodoroSec = $('#pomodoro_timer_seconds').val();
    var shortBreakMin = $('#short_break_minutes').val();
    var shortBreakSec = $('#short_break_seconds').val();
    var longBreakMin = $('#long_break_minutes').val();
    var longBreakSec = $('#long_break_seconds').val();
    if(pomodoroMin !== '' && pomodoroSec !== '' && shortBreakMin !== '' && shortBreakSec !== '' && longBreakMin !== '' && longBreakSec !== '') {
        localStorage.setItem('pomodoro_min', pomodoroMin);
        localStorage.setItem('pomodoro_sec', pomodoroSec);
        localStorage.setItem('short_break_min', shortBreakMin);
        localStorage.setItem('short_break_sec', shortBreakSec);
        localStorage.setItem('long_break_min', longBreakMin);
        localStorage.setItem('long_break_sec', longBreakSec);
        $('#pomodoroTimerModal').modal('toggle');
        $('#success_alert').slideDown();
        setTimeout(function(){
            $('#success_alert').slideUp();
        }, 6000);

        resetTimerWithButton('#reset_pomodoro_timer');
        var timerType = $('.active_timer_button').attr('id');
        if(timerType === 'pomodoro') {
            if (pomodoroMin.length === 1) {
                minutes = '0' + pomodoroMin;
            }
            else {
                minutes = pomodoroMin;
            }
            if (pomodoroSec.length === 1) {
                seconds = '0' + pomodoroSec;
            }
            else {
                seconds = pomodoroSec;
            }
        }
        else if(timerType === 'short_break'){
            if (shortBreakMin.length === 1) {
                minutes = '0' + shortBreakMin;
            }
            else {
                minutes = shortBreakMin;
            }
            if (shortBreakSec.length === 1) {
                seconds = '0' + shortBreakSec;
            }
            else {
                seconds = shortBreakSec;
            }
        }
        else {
            if (longBreakMin.length === 1) {
                minutes = '0' + longBreakMin;
            }
            else {
                minutes = longBreakMin;
            }
            if (longBreakSec.length === 1) {
                seconds = '0' + longBreakSec;
            }
            else {
                seconds = longBreakSec;
            }
        }
        $('#pomodoro_timer').html(minutes+':'+seconds);
    }
    else {
        $('#empty_fields_alert').slideDown();
        setTimeout(function(){
            $('#empty_fields_alert').slideUp();
        }, 6000);
    }


}

$(document).ready(function() {
    //checks notifications permission
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
    else {
        var notif = new Notification('Notification', {
            body: "Notifications are allowed."
        });
        setTimeout(notif.close.bind(notif), 2000);
    }
    if(!localStorage.getItem('pomodoro_min')){
        localStorage.setItem('pomodoro_min', $('#pomodoro_timer_minutes').val());
    }
    if(!localStorage.getItem('pomodoro_sec')){
        localStorage.setItem('pomodoro_sec', $('#pomodoro_timer_seconds').val());
    }
    if(!localStorage.getItem('short_break_min')){
        localStorage.setItem('short_break_min', $('#short_break_minutes').val());
    }
    if(!localStorage.getItem('short_break_sec')){
        localStorage.setItem('short_break_sec', $('#short_break_seconds').val());
    }
    if(!localStorage.getItem('long_break_min')){
        localStorage.setItem('long_break_min', $('#long_break_minutes').val());
    }
    if(!localStorage.getItem('long_break_sec')){
        localStorage.setItem('long_break_sec', $('#long_break_seconds').val());
    }
    var pomodoroMin = localStorage.getItem('pomodoro_min');
    var pomodoroSec = localStorage.getItem('pomodoro_sec');
    var shortBreakMin = localStorage.getItem('short_break_min');
    var shortBreakSec = localStorage.getItem('short_break_sec');
    var longBreakMin = localStorage.getItem('long_break_min');
    var longBreakSec = localStorage.getItem('long_break_sec');
    if(pomodoroMin.length === 1){
        $('#pomodoro_timer_minutes').val('0' + pomodoroMin);
    }
    else if(pomodoroMin.length === 2){
        $('#pomodoro_timer_minutes').val(pomodoroMin);
    }
    if(pomodoroSec.length === 1){
        $('#pomodoro_timer_seconds').val('0' + pomodoroSec);
    }
    else if(pomodoroSec.length === 2){
        $('#pomodoro_timer_seconds').val(pomodoroSec);
    }
    if(shortBreakMin.length === 1){
        $('#short_break_minutes').val('0' + shortBreakMin);
    }
    else if(shortBreakMin.length === 2){
        $('#short_break_minutes').val(shortBreakMin);
    }
    if(shortBreakSec.length === 1){
        $('#short_break_seconds').val('0' + shortBreakSec);
    }
    else if(shortBreakSec.length === 2){
        $('#short_break_seconds').val(shortBreakSec);
    }
    if(longBreakMin.length === 1){
        $('#long_break_minutes').val('0' + longBreakMin);
    }
    else if(longBreakMin.length === 2){
        $('#long_break_minutes').val(longBreakMin);
    }
    if(longBreakSec.length === 1){
        $('#long_break_seconds').val('0' + longBreakSec);
    }
    else if(longBreakSec.length === 2){
        $('#long_break_seconds').val(longBreakSec);
    }

    $('#pomodoro_timer').html($('#pomodoro_timer_minutes').val()+':'+$('#pomodoro_timer_seconds').val());
    
    var name = "info";
    var domain = "1s0s.com";
    $('.contact-us-details').append('<a href=\"mailto:' + name + '@' + domain + '\">' + name + '@' + domain + '</a>');

    //initializes history
    if(localStorage.getItem('pomodoro_history')){
        var pomodoroHistory = JSON.parse(localStorage.getItem('pomodoro_history'));
        $('#pomodoro_amount').text(pomodoroHistory.amount);
        $('#pomodoro_total_time').text(pomodoroHistory.min + ' min ' +  pomodoroHistory.sec + ' sec');
    }
    if(localStorage.getItem('short_break_history')){
        var shortBreakHistory = JSON.parse(localStorage.getItem('short_break_history'));
        $('#short_break_amount').text(shortBreakHistory.amount);
        $('#short_break_total_time').text(shortBreakHistory.min + ' min ' +  shortBreakHistory.sec + ' sec');
    }
    if(localStorage.getItem('long_break_history')){
        var longBreakHistory = JSON.parse(localStorage.getItem('long_break_history'));
        $('#long_break_amount').text(longBreakHistory.amount);
        $('#long_break_total_time').text(longBreakHistory.min + ' min ' +  longBreakHistory.sec + ' sec');
    }
    if(sessionStorage.getItem('pomodoro_current_history')){
        var pomodoroCurrentHistory = JSON.parse(sessionStorage.getItem('pomodoro_current_history'));
        $('#pomodoro_current_amount').text(pomodoroCurrentHistory.amount);
        $('#pomodoro_current_total_time').text(pomodoroCurrentHistory.min + ' min ' +  pomodoroCurrentHistory.sec + ' sec');
    }
    if(sessionStorage.getItem('short_break_current_history')){
        var shortBreakCurrentHistory = JSON.parse(sessionStorage.getItem('short_break_current_history'));
        $('#short_break_current_amount').text(shortBreakCurrentHistory.amount);
        $('#short_break_current_total_time').text(shortBreakCurrentHistory.min + ' min ' +  shortBreakCurrentHistory.sec + ' sec');
    }
    if(sessionStorage.getItem('long_break_current_history')){
        var longBreakCurrentHistory = JSON.parse(sessionStorage.getItem('long_break_current_history'));
        $('#long_break_current_amount').text(longBreakCurrentHistory.amount);
        $('#long_break_current_total_time').text(longBreakCurrentHistory.min + ' min ' +  longBreakCurrentHistory.sec + ' sec');
    }
});