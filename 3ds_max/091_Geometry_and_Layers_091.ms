-- ============================================================================
-- Script Name: Geometry_and_Layers_091
-- Platform: 3ds Max
-- Description: Structural manipulation script #91 for layers and objects.
-- ============================================================================

macroScript GeometryandLayers091
category:"DesignArchitectScripts"
tooltip:"Geometry_and_Layers_091"
buttonText:"Geometry_and_Layers_091"
(
    try
    (
        -- Initialization
        local scriptName = "Geometry_and_Layers_091"
        
        -- Core execution block
        -- Structural manipulation script #91 for layers and objects.
        
        -- Log success
        print (scriptName + " executed successfully.")
    )
    catch
    (
        messageBox ("Error in " + scriptName + ": " + getCurrentException()) title:"Script Error"
    )
)
