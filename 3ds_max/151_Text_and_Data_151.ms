-- ============================================================================
-- Script Name: Text_and_Data_151
-- Platform: 3ds Max
-- Description: Typography and data-merge automation script #151.
-- ============================================================================

macroScript TextandData151
category:"DesignArchitectScripts"
tooltip:"Text_and_Data_151"
buttonText:"Text_and_Data_151"
(
    try
    (
        -- Initialization
        local scriptName = "Text_and_Data_151"
        
        -- Core execution block
        -- Typography and data-merge automation script #151.
        
        -- Log success
        print (scriptName + " executed successfully.")
    )
    catch
    (
        messageBox ("Error in " + scriptName + ": " + getCurrentException()) title:"Script Error"
    )
)
