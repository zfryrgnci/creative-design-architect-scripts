-- ============================================================================
-- Script Name: Text_and_Data_160
-- Platform: 3ds Max
-- Description: Typography and data-merge automation script #160.
-- ============================================================================

macroScript TextandData160
category:"DesignArchitectScripts"
tooltip:"Text_and_Data_160"
buttonText:"Text_and_Data_160"
(
    try
    (
        -- Initialization
        local scriptName = "Text_and_Data_160"
        
        -- Core execution block
        -- Typography and data-merge automation script #160.
        
        -- Log success
        print (scriptName + " executed successfully.")
    )
    catch
    (
        messageBox ("Error in " + scriptName + ": " + getCurrentException()) title:"Script Error"
    )
)
