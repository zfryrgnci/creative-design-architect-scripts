-- ============================================================================
-- Script Name: Text_and_Data_173
-- Platform: 3ds Max
-- Description: Typography and data-merge automation script #173.
-- ============================================================================

macroScript TextandData173
category:"DesignArchitectScripts"
tooltip:"Text_and_Data_173"
buttonText:"Text_and_Data_173"
(
    try
    (
        -- Initialization
        local scriptName = "Text_and_Data_173"
        
        -- Core execution block
        -- Typography and data-merge automation script #173.
        
        -- Log success
        print (scriptName + " executed successfully.")
    )
    catch
    (
        messageBox ("Error in " + scriptName + ": " + getCurrentException()) title:"Script Error"
    )
)
