{{/*
Create the name of the service account to use
*/}}
{{- define "devopsbasics-chart.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "devopsbasics-chart.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}