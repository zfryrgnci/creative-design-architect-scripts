-- ============================================================================
-- Script Name: Text_and_Data_172
-- Platform: 3ds Max
-- Description: Typography and data-merge automation script #172.
-- ============================================================================

macroScript TextandData172
category:"DesignArchitectScripts"
tooltip:"Text_and_Data_172"
buttonText:"Text_and_Data_172"
(
    try
    (
        -- Initialization
        local scriptName = "Text_and_Data_172"
        
        -- Core execution block
        -- Typography and data-merge automation script #172.
        
        -- Log success
        print (scriptName + " executed successfully.")
    )
    catch
    (
        messageBox ("Error in " + scriptName + ": " + getCurrentException()) title:"Script Error"
    )
)
