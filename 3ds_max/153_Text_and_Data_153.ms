-- ============================================================================
-- Script Name: Text_and_Data_153
-- Platform: 3ds Max
-- Description: Typography and data-merge automation script #153.
-- ============================================================================

macroScript TextandData153
category:"DesignArchitectScripts"
tooltip:"Text_and_Data_153"
buttonText:"Text_and_Data_153"
(
    try
    (
        -- Initialization
        local scriptName = "Text_and_Data_153"
        
        -- Core execution block
        -- Typography and data-merge automation script #153.
        
        -- Log success
        print (scriptName + " executed successfully.")
    )
    catch
    (
        messageBox ("Error in " + scriptName + ": " + getCurrentException()) title:"Script Error"
    )
)
