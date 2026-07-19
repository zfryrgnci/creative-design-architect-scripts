-- Camera_Rig_Generator.ms
-- Automatically creates a cinematic camera rig: A camera targeted to a dummy,
-- linked to a circular spline path for perfect 360 orbits.

macroScript CameraRigGenerator category:"CreativeArchitect" tooltip:"Create Orbit Camera Rig"
(
    on execute do
    (
        undo "Camera Rig" on
        (
            -- Create Target
            local camTarget = Dummy boxsize:[10,10,10] name:"Rig_Target"
            camTarget.pos = [0,0,50]
            
            -- Create Path
            local rigPath = Circle radius:200 name:"Rig_Path"
            rigPath.pos = [0,0,50]
            
            -- Create Camera
            local cam = TargetCamera pos:[200,0,50] target:camTarget name:"Rig_Camera"
            cam.fov = 35
            
            -- Path Constraint
            local pc = Path_Constraint()
            pc.path = rigPath
            pc.follow = true
            cam.pos.controller = pc
            
            -- Set up animation keys for a 100-frame orbit
            animate on
            (
                at time 0 pc.percent = 0
                at time 100 pc.percent = 100
            )
            
            print "Cinematic Orbit Rig generated!"
        )
    )
)
