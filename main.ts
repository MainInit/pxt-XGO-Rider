/**
* Functions to micro:bit XGO Robot Kit by ELECFREAKS Co.,Ltd.
*/
//% color=#8600FF icon="\uf1b0"
//% block="xgo" blockId="xgo"
namespace xgo {

    export enum rotate_enum {
        //% block="Left"
        Left,
        //% block="Right"
        Right
    }

    export enum direction_enum {
        //% block="Forward"
        Forward,
        //% block="Backward"
        Backward,
        //% block="left"
        Left,
        //% block="Right"
        Right
    }

    export enum speed_frequency_enum {
        //% block="servo speed"
        servo_speed,
        //% block="stepped frequency"
        stepped_frequency
    }

    export enum speed_enum {
        //% block="fast"
        fast = 0xf0,
        //% block="normal"
        normal = 0x80,
        //% block="slow"
        slow = 0x10
    }

    export enum translation_direction_enum {
        //% block="forward(0mm~25mm)"
        Forward,
        //% block="backward(-25mm~0mm)"
        Backward,
        //% block="left-shift(0mm~18mm)"
        left_shift,
        //% block="right-shift(-18mm~0mm)"
        right_shift
    }

    export enum rotate_direction_enum {
        //% block="left-turn"
        turn_left,
        //% block="right-turn"
        turn_right
    }

    export enum body_direction_xyz_enum {
        //% block="X"
        X,
        //% block="Y"
        Y,
        //% block="Z"
        Z
    }

    export enum translation_xyz_enum {
        //% block="X(-35mm~35mm)"
        X,
        //% block="Y(-18mm~18mm)"
        Y,
        //% block="Z(75mm~115mm)"
        Z
    }

    export enum switch_enum {
        //% block="Turn on"
        Turn_on,
        //% block="Turn off"
        Turn_off
    }

    export enum servo_switch_enum {
        //% block="load"
        Load,
        //% block="unload"
        Unload
    }

    export enum body_parts_enum {
        //% block="left front"
        left_front,
        //% block="left hind"
        left_hind,
         //% block="right front"
        right_front,
         //% block="right hind"
        right_hind
    }

    export enum joint_enum {
        //% block="upper"
        upper,
        //% block="middle"
        middle,
        //% block="below"
        below
    }

    export enum turn_joint_enum {
        //% block="upper(-30~30)"
        upper,
        //% block="middle(-70~90)"
        middle,
        //% block="below(-70~50)"
        below
    }

    export enum action_enum {
        //% block="Default_posture"
        Default_posture,
        //% block="Go_prone"
        Go_prone,
        //% block="Stand"
        Stand,
        //% block="Crawl_forward"
        Crawl_forward,
        //% block="Whirl"
        Whirl,
        //% block="Sur_place"
        Sur_place,
        //% block="Squat"
        Squat,
        //% block="Twirl_Roll"
        Twirl_Roll,
        //% block="Twirl_Pitch"
        Twirl_Pitch,
        //% block="Twirl_Yaw"
        Twirl_Yaw,
        //% block="Triaxial_rotation"
        Triaxial_rotation,
        //% block="Pee"
        Pee,
        //% block="Sit_down"
        Sit_down,
        //% block="Wave"
        Wave,
        //% block="Stretch_oneself"
        Stretch_oneself,
        //% block="Play_pendulum"
        Play_pendulum,
        //% block="Request_feeding"
        Request_feeding,
        //% block="Looking_for_food"
        Looking_for_food,
        //% block="Handshake"
        Handshake
    }

    //% block="Rotate %direction,speed is %speed\\%"
    //% speed.min=0 speed.max=100
    export function rotate(direction:rotate_enum,speed:number) {
        let rotate_buffer = pins.createBuffer(9)
        rotate_buffer[0] = 0x55
        rotate_buffer[1] = 0x00
        rotate_buffer[2] = 0x09
        rotate_buffer[3] = 0x00
        rotate_buffer[4] = 0x32
        rotate_buffer[7] = 0x00
        rotate_buffer[8] = 0xAA
        if (speed > 100)
            speed = 100
        if (speed < 0)
            speed = 0
        switch (direction) {
            case rotate_enum.Right:
                rotate_buffer[5] = Math.map(speed, 0, 100, 128, 0)
                rotate_buffer[6] = ~(0x09 + 0x00 + 0x32 + rotate_buffer[5])
                break
            case rotate_enum.Left:
                rotate_buffer[5] = Math.map(speed, 0, 100, 128, 255)
                rotate_buffer[6] = ~(0x09 + 0x00 + 0x32 + rotate_buffer[5])
                break
        }
        serial.writeBuffer(rotate_buffer)
    }

    //% block="Body height %height\\%"
    //% height.min=0 height.max=100
    export function body_height(height: number) {
        let height_buffer = pins.createBuffer(9)
        if (height > 100)
            height = 100
        if (height < 0)
            height = 0
        height_buffer[0] = 0x55
        height_buffer[1] = 0x00
        height_buffer[2] = 0x09
        height_buffer[3] = 0x00
        height_buffer[4] = 0x35
        height_buffer[5] = Math.map(height, 0, 100, 0, 255)
        height_buffer[6] = ~(0x09 + 0x00 + 0x35 + height_buffer[5])
        height_buffer[7] = 0x00
        height_buffer[8] = 0xAA
        serial.writeBuffer(height_buffer)
    }

    /**
    * TODO: initialization xgo
    * @param tx describe parameter here, eg: SerialPin.P2
    * @param rx describe parameter here, eg: SerialPin.P1
    */
    //% block="set XGO|TX %tx|RX %rx"
    //% weight=101
    export function init_xgo_serial(tx: SerialPin, rx: SerialPin) {
        serial.redirect(tx, rx, BaudRate.BaudRate115200)
        xgo.init_action()
    }

    //% block="move%direction speed %speed\\%"
    //% speed.min=0 speed.max=100
    export function move_xgo(direction: direction_enum,speed:number) {
        let move_buffer = pins.createBuffer(9)
        move_buffer[0] = 0x55
        move_buffer[1] = 0x00
        move_buffer[2] = 0x09
        move_buffer[3] = 0x00
        move_buffer[7] = 0x00
        move_buffer[8] = 0xAA
        if (speed > 100)
            speed = 100
        if (speed < 0)
            speed = 0
        switch (direction) {
            case direction_enum.Forward:
                move_buffer[4] = 0x30
                move_buffer[5] = Math.map(speed, 0, 100, 128, 255)
                move_buffer[6] = ~(0x09 + 0x00 + 0x30 + move_buffer[5])
                break
            case direction_enum.Backward:
                move_buffer[4] = 0x30
                move_buffer[5] = Math.map(speed, 0, 100, 128, 0)
                move_buffer[6] = ~(0x09 + 0x00 + 0x30 + move_buffer[5])
                break
            case direction_enum.Left:
                move_buffer[4] = 0x31
                move_buffer[5] = Math.map(speed, 0, 100, 128, 0)
                move_buffer[6] = ~(0x09 + 0x00 + 0x31 + move_buffer[5])
                break
            case direction_enum.Right:
                move_buffer[4] = 0x31
                move_buffer[5] = Math.map(speed, 0, 100, 128, 255)
                move_buffer[6] = ~(0x09 + 0x00 + 0x31 + move_buffer[5])
                break
        }
        serial.writeBuffer(move_buffer)
    }

    //%block="Set %speed_frequency speed to %speed"
    export function set_speed_frequency(speed_frequency: speed_frequency_enum, speed: speed_enum) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        if (speed_frequency == speed_frequency_enum.servo_speed) {
            commands_buffer[4] = 0x5C
            commands_buffer[5] = speed
        }
        else {
            commands_buffer[4] = 0x3D
            if (speed == speed_enum.fast)
                commands_buffer[5] = 0x02
            else if (speed == speed_enum.normal)
                commands_buffer[5] = 0x00
            else if (speed == speed_enum.slow)
                commands_buffer[5] = 0x01
        }
        commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
    }

    //%block="Set %part leg %joint servo to %angle"
    //% angle.min=-70  angle.max=90
    export function set_servo_angle(part: body_parts_enum, joint: turn_joint_enum, angle: number) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        switch (part) {
            case body_parts_enum.left_front:
                if (joint == turn_joint_enum.upper) {
                    commands_buffer[4] = 0x52
                }
                else if (joint == turn_joint_enum.middle) {
                    commands_buffer[4] = 0x51
                }
                else {
                    commands_buffer[4] = 0x50
                }
                break
            case body_parts_enum.left_hind:
                if (joint == turn_joint_enum.upper) {
                    commands_buffer[4] = 0x5B
                }
                else if (joint == turn_joint_enum.middle) {
                    commands_buffer[4] = 0x5A
                }
                else {
                    commands_buffer[4] = 0x59
                }
                break
            case body_parts_enum.right_front:
                if (joint == turn_joint_enum.upper) {
                    commands_buffer[4] = 0x55
                }
                else if (joint == turn_joint_enum.middle) {
                    commands_buffer[4] = 0x54
                }
                else {
                    commands_buffer[4] = 0x53
                }
                break
            case body_parts_enum.right_hind:
                if (joint == turn_joint_enum.upper) {
                    commands_buffer[4] = 0x58
                }
                else if (joint == turn_joint_enum.middle) {
                    commands_buffer[4] = 0x57
                }
                else {
                    commands_buffer[4] = 0x56
                }
                break
        }
        switch (joint) {
            case joint_enum.upper:
                if (angle > 30)
                    angle = 30
                if (angle < -30)
                    angle = -30
                commands_buffer[5] = Math.map(angle, -30, 30, 0, 255)
                break
            case joint_enum.middle:
                if (angle > 90)
                    angle = 90
                if (angle < -70)
                    angle = -70
                commands_buffer[5] = Math.map(angle, -70, 90, 0, 255)
                break
            case joint_enum.below:
                if (angle > 50)
                    angle = 50
                if (angle < -70)
                    angle = -70
                commands_buffer[5] = Math.map(angle, -70, 50, 0, 255)
                break
        }
        commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
    }

    //%block="Set the X position of the tip of the %part leg to%location_x, Y position to%location_y, Z position to%location_z"
    export function single_leg(part: body_parts_enum, location_x: number, location_y: number, location_z: number) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        let X = Math.map(location_x, -35, 35, 0, 255)
        let Y = Math.map(location_y, -18, 18, 0, 255)
        let Z = Math.map(location_z, 75, 115, 0, 255)
        switch (part) {
            case body_parts_enum.left_front:
                commands_buffer[4] = 0x40
                commands_buffer[5] = X
                commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                serial.writeBuffer(commands_buffer)
                basic.pause(50)
                commands_buffer[4] = 0x41
                commands_buffer[5] = Y
                commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                serial.writeBuffer(commands_buffer)
                basic.pause(50)
                commands_buffer[4] = 0x42
                commands_buffer[5] = Z
                commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                serial.writeBuffer(commands_buffer)
                break
            case body_parts_enum.right_front:
                commands_buffer[4] = 0x43
                commands_buffer[5] = X
                commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                serial.writeBuffer(commands_buffer)
                basic.pause(50)
                commands_buffer[4] = 0x44
                commands_buffer[5] = Y
                commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                serial.writeBuffer(commands_buffer)
                basic.pause(50)
                commands_buffer[4] = 0x45
                commands_buffer[5] = Z
                commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                serial.writeBuffer(commands_buffer)
                break
            case body_parts_enum.right_hind:
                commands_buffer[4] = 0x46
                commands_buffer[5] = X
                commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                serial.writeBuffer(commands_buffer)
                basic.pause(50)
                commands_buffer[4] = 0x47
                commands_buffer[5] = Y
                commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                serial.writeBuffer(commands_buffer)
                basic.pause(50)
                commands_buffer[4] = 0x48
                commands_buffer[5] = Z
                commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                serial.writeBuffer(commands_buffer)
                break
            case body_parts_enum.left_hind:
                commands_buffer[4] = 0x49
                commands_buffer[5] = X
                commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                serial.writeBuffer(commands_buffer)
                basic.pause(50)
                commands_buffer[4] = 0x4A
                commands_buffer[5] = Y
                commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                serial.writeBuffer(commands_buffer)
                basic.pause(50)
                commands_buffer[4] = 0x4B
                commands_buffer[5] = Z
                commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
                serial.writeBuffer(commands_buffer)
                break
        }
    }

    //%block="Set XGO to perform a %direction translational motion with a step size of %step mm"
    //% step.min=5 step.max=25
    export function translational_step(direction: translation_direction_enum, step: number) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        if (step > 25)
            step = 25
        if (step < 5)
            step = 5
        switch (direction) {
            case translation_direction_enum.Forward:
                commands_buffer[4] = 0x30
                commands_buffer[5] = Math.map(step, 0, 25, 128, 255)
                break
            case translation_direction_enum.Backward:
                commands_buffer[4] = 0x30
                commands_buffer[5] = Math.map(step, 0, 25, 128, 0)
                break
            case translation_direction_enum.left_shift:
                commands_buffer[4] = 0x31
                commands_buffer[5] = Math.map(step, 0, 25, 128, 0)
                break
            case translation_direction_enum.right_shift:
                commands_buffer[4] = 0x31
                commands_buffer[5] = Math.map(step, 0, 25, 128, 255)
                break
        }
        commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
    }

    //%block="Set XGO to perform a %direction translational motion with a step size of %step mm for %time seconds"
    //% step.min=5 step.max=25
    export function translational_step_continue(direction: translation_direction_enum, step: number,time:number) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        if (step > 25)
            step = 25
        if (step < 5)
            step = 5
        switch (direction) {
            case translation_direction_enum.Forward:
                commands_buffer[4] = 0x30
                commands_buffer[5] = Math.map(step, 0, 25, 128, 255)
                break
            case translation_direction_enum.Backward:
                commands_buffer[4] = 0x30
                commands_buffer[5] = Math.map(step, 0, 25, 128, 0)
                break
            case translation_direction_enum.left_shift:
                commands_buffer[4] = 0x31
                commands_buffer[5] = Math.map(step, 0, 25, 128, 0)
                break
            case translation_direction_enum.right_shift:
                commands_buffer[4] = 0x31
                commands_buffer[5] = Math.map(step, 0, 25, 128, 255)
                break
        }
        commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
        basic.pause(time * 1000)
        commands_buffer[5] = 0x80
        commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
    }

    //% block="Set XGO to perform a %direction rotation at a speed of %speed degrees per second"
    //% speed.min=0 speed.max=150
    export function rotate_angle(direction: rotate_direction_enum,speed:number) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[4] = 0x32
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        if (speed > 150)
            speed = 150
        if (speed < 0)
            speed = 0
        switch (direction) {
            case rotate_direction_enum.turn_left:
                commands_buffer[5] = Math.map(speed, 0, 150, 128, 255)
                break
            case rotate_direction_enum.turn_right:
                commands_buffer[5] = Math.map(speed, 0, 150, 128, 0)
                break
        }
        commands_buffer[6] = ~(0x09 + 0x00 + 0x32 + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
    }

    //% block="Set XGO to perform a %direction rotation at a speed of %speed degrees per second for %time seconds"
    //% speed.min=0 speed.max=150
    export function rotate_angle_continue(direction: rotate_direction_enum,speed:number,time:number) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[4] = 0x32
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        if (speed > 150)
            speed = 150
        if (speed < 0)
            speed = 0
        switch (direction) {
            case rotate_direction_enum.turn_left:
                commands_buffer[5] = Math.map(speed, 0, 150, 128, 255)
                break
            case rotate_direction_enum.turn_right:
                commands_buffer[5] = Math.map(speed, 0, 150, 128, 0)
                break
        }
        commands_buffer[6] = ~(0x09 + 0x00 + 0x32 + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
        basic.pause(time * 1000)
        commands_buffer[5] = 0x80
        commands_buffer[6] = ~(0x09 + 0x00 + 0x32 + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
    }

    //% block="Set XGO execution to run in place at a fixed frequency at a leg lift height of %mm mm"
    //% mm.min=10 mm.max=35
    export function leg_lift(mm:number) {
        let commands_buffer = pins.createBuffer(9)
        if (mm > 35)
            mm = 35
        if (mm < 10)
            mm = 10
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[4] = 0x3C
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        commands_buffer[5] = Math.map(mm, 8, 35, 0, 255)
        commands_buffer[6] = ~(0x09 + 0x00 + 0x3C + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
    }

    //% block="Set XGO execution to run in place at a fixed frequency at a leg lift height of %mm mm for %time seconds"
    //% mm.min=10 mm.max=35
    export function leg_lift_continue(mm:number,time:number) {
        let commands_buffer = pins.createBuffer(9)
        if (mm > 35)
            mm = 35
        if (mm < 10)
            mm = 10
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[4] = 0x3C
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        commands_buffer[5] = Math.map(mm, 10, 35, 0, 255)
        commands_buffer[6] = ~(0x09 + 0x00 + 0x3C + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
        basic.pause(time * 1000)
        commands_buffer[5] = 0
        commands_buffer[6] = ~(0x09 + 0x00 + 0x3C + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
    }

    //% block="Set the XGO's body to pan %distance mm in the %direction_xyz direction"
    //% distance.min=-35  distance.max=115
    export function translational_motion(direction_xyz: translation_xyz_enum, distance: number) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        switch (direction_xyz) {
            case translation_xyz_enum.X:
                commands_buffer[4] = 0x33
                if (distance > 35)
                    distance = 35
                if (distance < -35)
                    distance = -35
                commands_buffer[5] = Math.map(distance, -35, 35, 0, 255)
                break
            case translation_xyz_enum.Y:
                commands_buffer[4] = 0x34
                if (distance > 18)
                    distance = 18
                if (distance < -18)
                    distance = -18
                commands_buffer[5] = Math.map(distance, -18, 18,  0, 255)
                break
            case translation_xyz_enum.Z:
                commands_buffer[4] = 0x35
                if (distance > 115)
                    distance = 115
                if (distance < 75)
                    distance = 75
                commands_buffer[5] = Math.map(distance, 75, 115, 0, 255)
                break
        }
        commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
    }

    //% block="Set XGO to move back and forth in the %direction_xyz direction with a period of %period seconds"
    //% period.min=2  period.max=8
    export function translational_motion_reciprocate(direction_xyz: body_direction_xyz_enum, period: number) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        if (period > 8)
            period = 8
        if (period < 2)
            period = 2
        switch (direction_xyz) {
            case body_direction_xyz_enum.X:
                commands_buffer[4] = 0x80
                break
            case body_direction_xyz_enum.Y:
                commands_buffer[4] = 0x81
                break
            case body_direction_xyz_enum.Z:
                commands_buffer[4] = 0x82
                break
        }
        commands_buffer[5] = Math.map(period, 1, 8, 0, 255)
        commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
    }

    //% block="Stop the periodic translation of XGO in the  %direction_xyz direction"
    export function translational_motion_reciprocate_stop(direction_xyz: body_direction_xyz_enum) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        switch (direction_xyz) {
            case body_direction_xyz_enum.X:
                commands_buffer[4] = 0x80
                break
            case body_direction_xyz_enum.Y:
                commands_buffer[4] = 0x81
                break
            case body_direction_xyz_enum.Z:
                commands_buffer[4] = 0x82
                break
        }
        commands_buffer[5] = 0
        commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + 0x00)
        serial.writeBuffer(commands_buffer)
    }

    //% block="Set XGO to be rotated %angle degrees about the %direction_xyz axis"
    //% angle.min=-20 angle.max=20
    export function rotate_angle_reel(direction_xyz: body_direction_xyz_enum,angle:number) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        if (angle > 20)
            angle = 20
        if (angle < -20)
            angle = -20
        switch (direction_xyz) {
            case body_direction_xyz_enum.X:
                commands_buffer[4] = 0x36
                commands_buffer[5] = Math.map(angle, -20, 20, 0, 255)
                break
            case body_direction_xyz_enum.Y:
                commands_buffer[4] = 0x37
                commands_buffer[5] = Math.map(angle, -20, 20, 0, 255)
                break
            case body_direction_xyz_enum.Z:
                commands_buffer[4] = 0x38
                commands_buffer[5] = Math.map(angle, -20, 20, 0, 255)
                break
        }
        commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
    }

    //% block="Set XGO to rotate around the %direction_xyz axis with a period of %period seconds"
    //% period.min=2 period.max=8
    export function rotate_angle_reel_reciprocate(direction_xyz: body_direction_xyz_enum,period:number) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        if (period > 8)
            period = 8
        if (period < 2)
            period = 2
        switch (direction_xyz) {
            case body_direction_xyz_enum.X:
                commands_buffer[4] = 0x39
                break
            case body_direction_xyz_enum.Y:
                commands_buffer[4] = 0x3A
                break
            case body_direction_xyz_enum.Z:
                commands_buffer[4] = 0x3B
                break
        }
        commands_buffer[5] = Math.map(period, 2, 8, 0, 255)
        commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
    }

    //% block="Stop the periodic rotation of XGO around the %direction_xyz axis"
    export function rotate_angle_reel_reciprocate_stop(direction_xyz: body_direction_xyz_enum) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        switch (direction_xyz) {
            case body_direction_xyz_enum.X:
                commands_buffer[4] = 0x39
                break
            case body_direction_xyz_enum.Y:
                commands_buffer[4] = 0x3A
                break
            case body_direction_xyz_enum.Z:
                commands_buffer[4] = 0x3B
                break
        }
        commands_buffer[5] = 0
        commands_buffer[6] = ~(0x09 + 0x00 + commands_buffer[4] + 0x00)
        serial.writeBuffer(commands_buffer)
    }

    //% block="%on_off the dynamic balance mode"
    export function gyroscope_switch(on_off:switch_enum) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[4] = 0x61
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        switch (on_off) {
            case switch_enum.Turn_on:
                commands_buffer[5] = 0x01
                break
            case switch_enum.Turn_off:
                commands_buffer[5] = 0x00
                break
        }
        commands_buffer[6] = ~(0x09 + 0x00 + 0x61 + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
    }

    //% deprecated=true
    //% block="%on_off XGO performance mode"
    export function performance_model_switch(on_off:switch_enum) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[4] = 0x03
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        switch (on_off) {
            case switch_enum.Turn_on:
                commands_buffer[5] = 0x01
                break
            case switch_enum.Turn_off:
                commands_buffer[5] = 0x00
                break
        }
        commands_buffer[6] = ~(0x09 + 0x00 + 0x03 + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
    }

    //% block="%on_off all XGO servo"
    export function servo_switch(on_off:servo_switch_enum) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[4] = 0x20
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        switch (on_off) {
            case servo_switch_enum.Load:
                commands_buffer[5] = 0x00
                break
            case servo_switch_enum.Unload:
                commands_buffer[5] = 0x01
                break
        }
        commands_buffer[6] = ~(0x09 + 0x00 + 0x20 + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
    }

    //% block="Set XGO %part leg servo %on_off"
    export function servo_setting(part:body_parts_enum,on_off:servo_switch_enum) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[4] = 0x20
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        switch (part) {
            case body_parts_enum.left_front:
                if (on_off == servo_switch_enum.Load)
                    commands_buffer[5] = 0x21
                else
                    commands_buffer[5] = 0x11
                break
            case body_parts_enum.left_hind:
                if (on_off == servo_switch_enum.Load)
                    commands_buffer[5] = 0x22
                else
                    commands_buffer[5] = 0x14
                break
            case body_parts_enum.right_front:
                if (on_off == servo_switch_enum.Load)
                    commands_buffer[5] = 0x23
                else
                    commands_buffer[5] = 0x12
                break
            case body_parts_enum.right_hind:
                if (on_off == servo_switch_enum.Load)
                    commands_buffer[5] = 0x24
                else
                    commands_buffer[5] = 0x13
                break
        }
        commands_buffer[6] = ~(0x09 + 0x00 + 0x20 + commands_buffer[5])
        serial.writeBuffer(commands_buffer)
    }

    //%block="Get XGO's current power"
    export function get_electric_quantity():number{
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x02
        commands_buffer[4] = 0x01
        commands_buffer[5] = 0x01
        commands_buffer[6] = ~(0x09 + 0x02 + 0x01 + 0x01)
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        serial.writeBuffer(commands_buffer)
        let read_data_buffer = pins.createBuffer(9)
        read_data_buffer = serial.readBuffer(9)
        return read_data_buffer[5]
    }

    //% block="Get the servo Angle of the %joint %part leg joint"
    export function get_servo_angle(part:body_parts_enum,joint:joint_enum) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x02
        commands_buffer[4] = 0x50
        commands_buffer[5] = 0x0C
        commands_buffer[6] = ~(0x09 + 0x02 + 0x50 + 0x0C)
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        serial.writeBuffer(commands_buffer)
        let read_data_buffer = pins.createBuffer(20)
        read_data_buffer = serial.readBuffer(20)
        switch (part) {
            case body_parts_enum.left_front:
                if (joint == joint_enum.upper)
                    return read_data_buffer[5]
                else if (joint == joint_enum.middle)
                    return read_data_buffer[6]
                else
                    return read_data_buffer[7]
                break
            case body_parts_enum.left_hind:
                if (joint == joint_enum.upper)
                    return read_data_buffer[8]
                else if (joint == joint_enum.middle)
                    return read_data_buffer[9]
                else
                    return read_data_buffer[10]
                break
            case body_parts_enum.right_front:
                if (joint == joint_enum.upper)
                    return read_data_buffer[11]
                else if (joint == joint_enum.middle)
                    return read_data_buffer[12]
                else
                    return read_data_buffer[13]
                break
            case body_parts_enum.right_hind:
                if (joint == joint_enum.upper)
                    return read_data_buffer[14]
                else if (joint == joint_enum.middle)
                    return read_data_buffer[15]
                else
                    return read_data_buffer[16]
                break
        }
    }

    //% block="Execution action %action"
    //% weight=100
    export function execution_action(action: action_enum) {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[4] = 0x3E
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        switch (action) {
            case action_enum.Default_posture:
                commands_buffer[5] = 0xFF
                commands_buffer[6] = 0xB9
                break
            case action_enum.Go_prone:
                commands_buffer[5] = 0x01
                commands_buffer[6] = 0xB7
                break
            case action_enum.Stand:
                commands_buffer[5] = 0x02
                commands_buffer[6] = 0xB6
                break
            case action_enum.Crawl_forward:
                commands_buffer[5] = 0x03
                commands_buffer[6] = 0xB5
                break
            case action_enum.Whirl:
                commands_buffer[5] = 0x04
                commands_buffer[6] = 0xB4
                break
            case action_enum.Sur_place:
                commands_buffer[5] = 0x05
                commands_buffer[6] = 0xB3
                break
            case action_enum.Squat:
                commands_buffer[5] = 0x06
                commands_buffer[6] = 0xB2
                break
            case action_enum.Twirl_Roll:
                commands_buffer[5] = 0x07
                commands_buffer[6] = 0xB1
                break
            case action_enum.Twirl_Pitch:
                commands_buffer[5] = 0x08
                commands_buffer[6] = 0xB0
                break
            case action_enum.Twirl_Yaw:
                commands_buffer[5] = 0x09
                commands_buffer[6] = 0xAF
                break
            case action_enum.Triaxial_rotation:
                commands_buffer[5] = 0x0A
                commands_buffer[6] = 0xAE
                break
            case action_enum.Pee:
                commands_buffer[5] = 0x0B
                commands_buffer[6] = 0xAD
                break
            case action_enum.Sit_down:
                commands_buffer[5] = 0x0C
                commands_buffer[6] = 0xAC
                break
            case action_enum.Wave:
                commands_buffer[5] = 0x0D
                commands_buffer[6] = 0xAB
                break
            case action_enum.Stretch_oneself:
                commands_buffer[5] = 0x0E
                commands_buffer[6] = 0xAA
                break
            case action_enum.Play_pendulum:
                commands_buffer[5] = 0x10
                commands_buffer[6] = 0xA8
                break
            case action_enum.Request_feeding:
                commands_buffer[5] = 0x11
                commands_buffer[6] = 0xA7
                break
            case action_enum.Looking_for_food:
                commands_buffer[5] = 0x12
                commands_buffer[6] = 0xA6
                break
            case action_enum.Handshake:
                commands_buffer[5] = 0x13
                commands_buffer[6] = 0xA5
                break
        }
        serial.writeBuffer(commands_buffer)
    }

    //% block="restore initial action"
    export function init_action() {
        let commands_buffer = pins.createBuffer(9)
        commands_buffer[0] = 0x55
        commands_buffer[1] = 0x00
        commands_buffer[2] = 0x09
        commands_buffer[3] = 0x00
        commands_buffer[4] = 0x3E
        commands_buffer[5] = 0xFF
        commands_buffer[6] = ~(0x09 + 0x00 + 0x3E + 0xFF)
        commands_buffer[7] = 0x00
        commands_buffer[8] = 0xAA
        serial.writeBuffer(commands_buffer)
    }
}
