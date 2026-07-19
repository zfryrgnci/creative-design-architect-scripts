-- Light_Setup_Studio.ms
-- Automatically generates a standard 3-point studio lighting setup
-- (Key, Fill, Rim) focused around the origin or selected object.

macroScript LightSetupStudio category:"CreativeArchitect" tooltip:"Generate 3-Point Lighting"
(
    on execute do
    (
        undo "Studio Lights" on
        (
            local centerPos = [0,0,0]
            if selection.count > 0 then centerPos = selection.center
            
            -- Target Dummy
            local lightTarget = Dummy boxsize:[5,5,5] name:"Light_Target"
            lightTarget.pos = centerPos
            
            -- Key Light (Main, Warm)
            local keyLight = TargetDirectionallight pos:(centerPos + [-100, -100, 150]) target:lightTarget name:"Key_Light"
            keyLight.multiplier = 1.0
            keyLight.color = color 255 240 220
            keyLight.castShadows = true
            
            -- Fill Light (Soft, Cool, low intensity)
            local fillLight = TargetDirectionallight pos:(centerPos + [150, -50, 50]) target:lightTarget name:"Fill_Light"
            fillLight.multiplier = 0.4
            fillLight.color = color 200 220 255
            fillLight.castShadows = false
            
            -- Rim Light (Back, High intensity)
            local rimLight = TargetDirectionallight pos:(centerPos + [0, 200, 100]) target:lightTarget name:"Rim_Light"
            rimLight.multiplier = 1.5
            rimLight.color = color 255 255 255
            rimLight.castShadows = true
            
            print "3-Point Studio Lighting generated!"
        )
    )
)
