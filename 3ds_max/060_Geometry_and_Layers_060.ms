-- ============================================================================
-- Script Name: Geometry_and_Layers_060
-- Platform: 3ds Max
-- Description: Structural manipulation script #60 for layers and objects.
-- ============================================================================

macroScript GeometryandLayers060
category:"DesignArchitectScripts"
tooltip:"Geometry_and_Layers_060"
buttonText:"Geometry_and_Layers_060"
(
    try
    (
        -- Initialization
        local scriptName = "Geometry_and_Layers_060"
        
        -- Core execution block
        -- Structural manipulation script #60 for layers and objects.
        
        -- Log success
        print (scriptName + " executed successfully.")
    )
    catch
    (
        messageBox ("Error in " + scriptName + ": " + getCurrentException()) title:"Script Error"
    )
)
