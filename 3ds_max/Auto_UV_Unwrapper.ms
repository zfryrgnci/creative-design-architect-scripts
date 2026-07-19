-- Auto_UV_Unwrapper.ms
-- Applies a basic box/flatten mapping to all selected objects.
-- Speeds up the asset pipeline for hard-surface models.

macroScript AutoUVUnwrapper category:"CreativeArchitect" tooltip:"Auto Box UVW Map"
(
    on execute do
    (
        if selection.count == 0 then
        (
            messageBox "Please select objects to unwrap." title:"Auto UV"
            return false
        )
        
        undo "Auto UV" on
        (
            for obj in selection do
            (
                if superclassof obj == GeometryClass do
                (
                    local uvMod = Uvwmap()
                    uvMod.maptype = 4 -- Box mapping
                    uvMod.length = 100
                    uvMod.width = 100
                    uvMod.height = 100
                    
                    addModifier obj uvMod
                    collapseStack obj
                )
            )
            print "Auto UV applied to " + (selection.count as string) + " objects."
        )
    )
)
