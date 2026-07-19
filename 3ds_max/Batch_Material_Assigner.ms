-- Batch_Material_Assigner.ms
-- Randomly assigns predefined simple materials (Glass, Matte, Metal) 
-- to the selected geometry, perfect for pre-viz blockouts.

macroScript BatchMaterialAssigner category:"CreativeArchitect" tooltip:"Assign Random Materials"
(
    on execute do
    (
        if selection.count == 0 do
        (
            messageBox "Select objects to assign materials." title:"Material Assigner"
            return false
        )
        
        undo "Batch Materials" on
        (
            -- Define standard materials
            local matGlass = StandardMaterial name:"PreViz_Glass" opacity:40 diffuse:(color 150 200 255) specularLevel:90 glossiness:50
            local matMatte = StandardMaterial name:"PreViz_Matte" diffuse:(color 200 200 200) specularLevel:10 glossiness:10
            local matMetal = StandardMaterial name:"PreViz_Metal" diffuse:(color 50 50 50) specularLevel:100 glossiness:80
            
            local matArray = #(matGlass, matMatte, matMetal)
            
            for obj in selection do
            (
                if superclassof obj == GeometryClass do
                (
                    local randIdx = random 1 matArray.count
                    obj.material = matArray[randIdx]
                )
            )
            print "Random Pre-Viz materials assigned."
        )
    )
)
